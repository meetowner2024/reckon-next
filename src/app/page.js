import Home from "@/components/Home/Home";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const BASE_URL =
    typeof window === "undefined"
      ? process.env.INTERNAL_API_URL
      : process.env.NEXT_PUBLIC_BASE_URL;

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
    fetch(`${BASE_URL}/api/users/header/getHeader`),
    fetch(`${BASE_URL}/api/users/hero`),
    fetch(`${BASE_URL}/api/users/advantages`),
    fetch(`${BASE_URL}/api/users/products`),
    fetch(`${BASE_URL}/api/users/whychooseus`),
    fetch(`${BASE_URL}/api/users/testimonials`),
    fetch(`${BASE_URL}/api/users/faqs`),
    fetch(`${BASE_URL}/api/users/contactus/form-config`),
    fetch(`${BASE_URL}/api/users/footer`),
    fetch(`${BASE_URL}/api/users/productsDropdown`),
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

  const filterhero = hero
    .map((e) => e)
    .filter((e) => e.location === "main-slider");
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
        hero={filterhero}
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
