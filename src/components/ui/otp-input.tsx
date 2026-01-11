'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, Transition, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const OTPSuccess = () => (
    <div className="flex items-center gap-4 w-full">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-9 h-10 bg-green-500 ring-4 ring-green-800 text-white flex items-center justify-center rounded-lg"
        >
            <Check size={16} strokeWidth={3} />
        </motion.div>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-green-500 font-medium"
        >
            OTP Verified Successfully!
        </motion.p>
    </div>
);

const OTPError = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-center text-red-400 font-medium mt-2"
    >
        Invalid OTP
    </motion.div>
);

const OTPInputBox = ({
    index,
    verifyOTP,
    state
}: {
    index: number;
    verifyOTP: () => boolean | null;
    state: 'idle' | 'error' | 'success';
}) => {
    const animationControls = useAnimationControls();

    const springTransition: Transition = { type: 'spring', stiffness: 700, damping: 20, delay: index * 0.05 };
    const noDelaySpringTransition: Transition = { type: 'spring', stiffness: 700, damping: 20 };
    const slowSuccessTransition: Transition = { type: 'spring', stiffness: 300, damping: 30, delay: index * 0.06 };

    useEffect(() => {
        animationControls.start({ opacity: 1, y: 0, transition: springTransition });
        return () => animationControls.stop();
    }, []);

    useEffect(() => {
        if (state === 'success') {
            animationControls.start({ x: -index * 44, transition: slowSuccessTransition });
        }
    }, [state]);

    const onFocus = () => animationControls.start({ y: -5, transition: noDelaySpringTransition });
    const onBlur = () => animationControls.start({ scale: 1, y: 0, transition: noDelaySpringTransition });

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === 'Backspace' && value) {
            (e.target as HTMLInputElement).value = '';
        } else if (e.key === 'Backspace' && !value && index > 0) {
            document.getElementById('otp-input-' + (index - 1))?.focus();
        } else if (index > 0 && e.key === 'ArrowLeft') {
            document.getElementById('otp-input-' + (index - 1))?.focus();
        } else if (index < 5 && e.key === 'ArrowRight') {
            document.getElementById('otp-input-' + (index + 1))?.focus();
        }
    };

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lastDigit = e.target.value[e.target.value.length - 1];
        if (lastDigit) e.target.value = lastDigit;
        if (e.target.value.length === 1 && index < 5) {
            document.getElementById('otp-input-' + (index + 1))?.focus();
        }
        const verified = verifyOTP();
        if (verified === null) return;
        if (verified === true) e.target.blur();
    };

    return (
        <motion.div
            className={cn(
                'w-9 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg ring-2 ring-transparent focus-within:shadow-inner overflow-hidden',
                state === 'error' ? 'ring-red-400' : state === 'success' ? 'ring-green-500' : 'focus-within:ring-blue-500'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={animationControls}
        >
            <motion.input
                id={'otp-input-' + index}
                onInput={onInput}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="0"
                className="border-none outline-none w-9 h-10 text-center bg-transparent placeholder:text-neutral-400 dark:placeholder:text-neutral-600 caret-transparent"
                disabled={state === 'success'}
            />
        </motion.div>
    );
};

interface OTPInputProps {
    correctOTP?: string;
    onSuccess?: () => void;
    onError?: () => void;
}

export function OTPInput({ correctOTP = '424242', onSuccess, onError }: OTPInputProps) {
    const [state, setState] = useState<'idle' | 'error' | 'success'>('idle');
    const animationControls = useAnimationControls();

    const errorAnimation = async () => {
        setState('error');
        onError?.();
        await animationControls.start({ x: [0, 3, -3, 3, -3, 0], transition: { duration: 0.1, ease: 'easeInOut' } });
    };

    const verifyOTP = () => {
        let code = '';
        for (let i = 0; i < 6; i++) {
            const input = document.getElementById('otp-input-' + i) as HTMLInputElement;
            if (input) code += input.value;
        }

        if (code.length === 6) {
            if (code === correctOTP) {
                setState('success');
                onSuccess?.();
                return true;
            } else {
                errorAnimation();
                return false;
            }
        } else {
            setState('idle');
            return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative">
                <AnimatePresence>
                    {state !== 'success' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute text-center w-full bottom-full left-0 mb-4 font-medium text-lg"
                        >
                            OTP Verification
                        </motion.p>
                    )}
                </AnimatePresence>
                <motion.div animate={animationControls} className="flex items-center justify-center gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <OTPInputBox key={'otp-input-' + index} index={index} verifyOTP={verifyOTP} state={state} />
                    ))}
                </motion.div>
                {state === 'success' && <div className="absolute inset-0 top-0 left-0"><OTPSuccess /></div>}
                {state === 'error' && <div className="absolute inset-0 top-full left-0"><OTPError /></div>}
            </div>
        </div>
    );
}

export default OTPInput;
