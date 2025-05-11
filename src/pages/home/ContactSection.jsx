const ContactSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
      <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-center">
        Looking to connect? Whether it’s support, inquiries, or feedback, we’re
        here for you. Contact us and we’ll get back to you as soon as possible.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full mt-1 p-2 border rounded-md"
            ></textarea>
          </div>
          <button className="bg-[#128068] hover:bg-lime-700 w-full text-white font-bold py-2 px-6 rounded">
            Send Message
          </button>
        </form>

        {/* Google Map */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.9097165158424!2d90.3890153154323!3d23.789593193089886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7c939eccb73%3A0x46b34845c8b8f764!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-96"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
