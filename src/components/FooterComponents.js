// components/FooterComponents.js
import React from 'react';
import Link from 'next/link';

export const Footer = ({ children, container }) => (
  <footer className="bg-gray-100 dark:bg-gray-900 py-4">
    <div className={`container mx-auto px-4 ${container ? 'w-full' : ''}`}>
      {children}
    </div>
  </footer>
);

export const FooterTitle = ({ title }) => (
  <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{title}</h2>
);

export const FooterLinkGroup = ({ children, col }) => (
  <ul className={`space-y-2 ${col ? 'flex flex-col' : ''}`}>{children}</ul>
);

export const FooterLink = ({ href, children, ariaLabel }) => (
  <li>
    <Link
      href={href}
      aria-label={ariaLabel}
      className="text-gray-600 dark:text-gray-400 hover:underline"
    >
      {children}
    </Link>
  </li>
);

export const FooterDivider = () => (
  <hr className="my-6 border-gray-300 dark:border-gray-700" />
);

export const FooterCopyright = ({ href, by, year }) => (
  <p className="text-sm text-gray-600 dark:text-gray-400">
    &copy; {year}{' '}
    <Link href={href} aria-label={by} className="hover:underline">
      {by}
    </Link>
  </p>
);

export const FooterIcon = ({ href, Icon, ariaLabel }) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
  >
    <Icon className="h-5 w-5" />
  </Link>
);
