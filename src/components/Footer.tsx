export default function Footer() {
    return (
        <footer className="w-full py-6">
            {/* Copyright */}
            <p
                className={`
                    text-sm text-pro700 dark:text-pro400
                    text-regular text-center
                `}
            >
                © {new Date().getFullYear()} Rohan Mistry. All rights reserved.
            </p>
        </footer>
    );
}