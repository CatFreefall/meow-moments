import Footer from "../components/common/Footer";
import LoginButton from "../components/common/LoginButton";
import RegisterButton from "../components/common/RegisterButton";

function NoPage() {
  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="flex flex-col justify-center">
        <h1 className="mx-5 text-center text-4xl font-header tracking-widest leading-tight mt-16">
          <span className="text-orange">Un-furr-tunately,</span> this page is
          empty! Head back with these!
        </h1>
        <div className="flex space-y-4 space-x-2 self-center">
          <div />
          <LoginButton />
          <RegisterButton />
          <div />
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default NoPage;
