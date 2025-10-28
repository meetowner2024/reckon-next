import Home from "@/components/Home/Home";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  function getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
    return (
      process.env.RENDER_EXTERNAL_URL || "https://reckon-next.onrender.com"
    );
  }
  const baseUrl = getBaseUrl();
  const [
    headerRes,
    heroRes,
    advRes,
    prodRes,
    whyRes,
    testRes,
    faqRes,
    contactRes,
    footerRes,
    projDropdownRes,
  ] = await Promise.all([
    fetch(`${baseUrl}/api/users/header/getHeader`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/hero`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/advantages`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/products`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/whychooseus`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/testimonials`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/faqs`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/contactus/form-config`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/footer`, {
      cache: "force-cache",
    }),
    fetch(`${baseUrl}/api/users/productsDropdown`, {
      cache: "force-cache",
    }),
  ]);
  const [
    header,
    heroRaw,
    advantagesData,
    products,
    whyChoose,
    testimonials,
    faqs,
    contactForm,
    footer,
    projectsDropdown,
  ] = await Promise.all([
    headerRes.json(),
    heroRes.json(),
    advRes.json(),
    prodRes.json(),
    whyRes.json(),
    testRes.json(),
    faqRes.json(),
    contactRes.json(),
    footerRes.json(),
    projDropdownRes.json(),
  ]);
  const hero = heroRaw.map((s) => ({
    ...s,
    image: `/uploads/${s.image.split("/").pop()}`,
  }));
  const advantages = advantagesData?.advantages ?? [];
  const mainTitle = advantagesData?.main_title ?? "The Reckonext Advantages";
  return (
    <main>
      <Home
        header={{
          logo: header?.logo
            ? `/uploads/${header.logo}`
            : "/assets/images/Reckonext-logo.png",
          phone: header?.phone ?? "+91 88860 77745",
        }}
        hero={hero}
        advantages={advantages}
        mainTitle={mainTitle}
        products={products}
        whyChoose={whyChoose}
        testimonials={testimonials}
        faqs={faqs}
        contactForm={contactForm}
        footer={footer}
        projectsDropdown={projectsDropdown}
      />
    </main>
  );
}
