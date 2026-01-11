import Link from 'next/link';

export function SiteFooter() {
    return (
        <footer className="w-full py-6 mt-12 border-t border-neutral-200 dark:border-zinc-800">
            <div className="flex items-center justify-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Made by</span>
                <Link
                    href="https://athrix.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-neutral-900 dark:text-white hover:underline"
                >
                    Athrix.me
                </Link>
                <span className="text-red-500">❤️</span>
            </div>
        </footer>
    );
}

export default SiteFooter;
