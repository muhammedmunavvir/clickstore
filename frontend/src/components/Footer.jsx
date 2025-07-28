"use client"

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Heart,
  Shield,
  Truck,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsSubscribing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Successfully subscribed to our newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      {/* <div className="bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest updates on new products, special offers, and pet care tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Clickstore</h2>
              <div className="w-12 h-1 bg-teal-500 rounded"></div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              ClickStore is a modern, user-friendly e-commerce platform offering a wide range of quality products including electronics, groceries, garments, books, and more. With a smooth shopping experience, real-time cart updates, secure checkout, and fast delivery, ClickStore ensures customers get everything they need — hassle-free and at the best price
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">Made with love for pet parents</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "All Products", href: "/Allproducts" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">clicksore </p>
                  <p className="text-gray-300">wayanad,kerala,india  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <a
                  href="mailto:support@clickstore.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  clickstore@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" /> */}
                {/* <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors duration-200">
                  +123 456 7890
                </a> */}
              </div>
            </div>
          </div>

          {/* Social Media & Trust Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
            <div className="flex space-x-4 mb-8">
              {[
                { icon: Facebook, href: "https://facebook.com", name: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
                { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-teal-600 hover:text-white transition-all duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Trust Indicators */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">Why Choose Us</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                {/* <div className="flex items-center space-x-2 text-gray-300">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Easy Returns</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h5 className="text-sm font-semibold text-white mb-2">Accepted Payment Methods</h5>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-blue-600">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-red-600">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-blue-800">PayPal</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-green-600">UPI</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">Available 24/7 • Customer Support</p>
              <p className="text-xs text-gray-500 mt-1">Response time: Within  24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {currentYear} Clickstore. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
