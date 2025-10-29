"use client"
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import { useSelector } from "react-redux";
import PageBanner from "@/components/PageBanner";
const PrivacyPolicy = () => {
     const footer = useSelector((state) => state.footer);
  const projects = useSelector((state) => state.projects.projectsDropdown);
  const header = useSelector((state) => state.header.header);
  return (
    <div className="bg-gray-50 text-gray-800 font-inter">

      <HeaderSection projectsDropdown={projects}  logo={header.logo} phone={header.phone}/>


      <PageBanner
        title="Privacy Policy"
        subtitle="Leading the industry with innovation and quality"
         image="/uploads/sideandfold1.jpg"
      />

      <section className=" mx-auto px-6 md:px-8 py-20">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500">
              Last updated on <span className="font-medium">October 15, 2025</span>
            </p>
          </header>

          <section className="space-y-6 text-lg leading-relaxed">
            <p>
              Thank you for showing interest and sharing your personal information. We will call you back in reference to your query that you have posted in our <strong>"Submit Enquiry"</strong> landing page.
            </p>

            <p>
              <strong>Reckon.EXT</strong> is pleased to serve you and expects to build and maintain your confidence in us. We do not sell, trade, or give away our mailing list. Any information you provide as a registered user is never shared with any individual or third party unless you explicitly inform us to do so. Your information is completely private and confidential with us.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10 border-l-4 border-blue-900 pl-4">
              Our Commitment to Privacy
            </h2>

            <p>
              We understand that privacy is of great concern to most users of the Internet and is a critical part of an enjoyable and satisfactory user experience. This guides everything that we strive to achieve. We are acutely aware of and sensitive to the privacy concerns of our customers and other visitors to our website.
            </p>

            <p>
              Whether you are a customer or a visitor to our site, we assure you that we do not collect personal information other than what you provide to complete a transaction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10 border-l-4 border-blue-900 pl-4">
              No Tracking or Third-Party Sharing
            </h2>

            <p>
              We do not use cookies to track the behavior of visitors to the website. Any information we collect is solely used to fulfill your requests or improve our service experience. We do not share, rent, or sell any information to third parties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10 border-l-4 border-blue-900 pl-4">
              Contact Us
            </h2>

            <p>
              We are happy to take your suggestions. Please feel free to contact us at{" "}
              <a
                href="mailto:reckonext@gmail.com"
                className="text-blue-900 hover:text-blue-800 font-medium"
              >
                reckonext@gmail.com
              </a>{" "}
              if you have any questions or suggestions regarding this policy.
            </p>
          </section>
        </article>
      </section>

      <Footer footer={footer.footerData} projects={projects}/>
    </div>
  );
};

export default PrivacyPolicy;
