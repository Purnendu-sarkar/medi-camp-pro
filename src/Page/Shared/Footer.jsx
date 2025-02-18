import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const Footer = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="w-full md:w-11/12 mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">MCMS</h2>
          <p className="mt-4 text-sm">
            Medical Camp Management System aims to provide easy management and
            coordination for organizers and participants. Join us to make
            healthcare accessible for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/available-camps"
                className="hover:text-blue-400 transition-colors"
              >
                Available Camps
              </a>
            </li>
            {user ? (
              isAdmin ? (
                <li>
                  <a
                    href="/dashboard/adminProfile"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Admin Profile
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="/dashboard/userHome"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Profile
                  </a>
                </li>
              )
            ) : (
              <li>
                <a
                  href="/join-us"
                  className="hover:text-blue-400 transition-colors"
                >
                  Join Us
                </a>
              </li>
            )}
            <li>
              <a
                href="/dashboard"
                className="hover:text-blue-400 transition-colors"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul>
            <li>
              Email:{" "}
              <a
                href="mailto:hellopurnendusarkar590@gmail.com"
                className="hover:text-blue-400 transition-colors"
              >
                hellopurnendusarkar590@gmail.com
              </a>
            </li>
            <li>Phone: +880 1409-012843</li>
            <li>Address: Amirpur, Paikgacha, Khulna, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/purnendusarkar4200"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors text-2xl"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/purnendusarkar4200"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-2xl"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/purnendu-sarkar-203b24332/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 transition-colors text-2xl"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/purnendu_sarkar_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Medical Camp Management System. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
