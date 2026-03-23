export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold text-white">DevNotes</h2>
                    <p className="mt-3 text-sm">
                        Sharing knowledge, tutorials and ideas about tech, coding and life.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
                        <li><a href="/about" className="hover:text-white">About</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Technology</li>
                        <li>Programming</li>
                        <li>Travel</li>
                        <li>Lifestyle</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-lg">
                        <a href="#">🌐</a>
                        <a href="#">🐙</a>
                        <a href="#">💼</a>
                        <a href="#">🐦</a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} DevNotes. All rights reserved.
            </div>
        </footer>
    );
}