import { FunctionComponent, useState } from "react";
import Layout from "../components/Layout/Layout";
import BestDiv from "../components/Layout/BestDiv";
import Link from "next/link";
import Image from "next/image";
import loginCover from "../assets/detailBg.png";
import axiosInstance from "@/hooks/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
interface RegisterProps { }
const Register: FunctionComponent<RegisterProps> = () => {
  const notify = (name: string) => toast.success("Тавтай морил :" + name);
  const notifyError = (error: string) => toast.error(error);
  const [form, setFormValue] = useState<any>({
    email: "",
    password: "",
    phone: "",
    registerNumber: "",
    confPass: "",
    firstname: " ",
    name: "",
  });

  const router = useRouter();
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.confPass) {
      return notifyError("Нууц үг зөрүүтэй байна");
    }

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("phone", form.phone);
    formData.append("registerNumber", form.registerNumber);
    formData.append("firstname", form.firstname);
    formData.append("name", form.name);
    axiosInstance
      .post("/customer", formData)
      .then((response) => {
        notify(response.data.data.name);
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the login request:",
          error.message
        );
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValue({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <Layout>
        <ToastContainer />
        <BestDiv>
          <section className="h-screen">
            <div className="h-full">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <Image
                    width={900}
                    height={900}
                    src={loginCover}
                    className="w-full"
                    alt="Sample image"
                  />
                </div>
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-row items-center justify-center lg:justify-start"></div>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <h1 className=" text-xl font-semibold ">Бүртгүүлэх</h1>
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput2">
                        Овог нэр:
                      </label>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder=""
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput2">Нэр:</label>
                      <input
                        type="text"
                        className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder=""
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput2">Имэйл:</label>{" "}
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder=""
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput2">Утас:</label>
                      <input
                        type="text"
                        className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="email"
                        placeholder="Email address"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput22">
                        Нууц үг:
                      </label>{" "}
                      <input
                        type="password"
                        className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput22"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput22">
                        Нууц үг давтах:
                      </label>{" "}
                      <input
                        type="password"
                        className=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput22"
                        placeholder="Password"
                        name="confPass"
                        value={form.confPass}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      >
                        Нэвтрэх
                      </button>
                      <p className="mb-0 mx-auto text-center text-sm font-semibold">
                        <Link
                          href="/login"
                          className="underline text-orange-500 transition duration-150 ease-in-out hover:text-orange-600 focus:text-orange-600 active:text-orange-700"
                        >
                          Бүртгэлээр нэвтрэх?
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </BestDiv>

        <div className=" my-[400px] "></div>
      </Layout>
    </>
  );
};

export default Register;
