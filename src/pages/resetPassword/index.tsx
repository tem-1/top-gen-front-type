import { FunctionComponent, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import BestDiv from "../components/Layout/BestDiv";
import Link from "next/link";
import Image from "next/image";
import loginCover from "../assets/detailBg.png";
import axiosInstance from "@/hooks/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import PasswordConfirm from "./PasswordConfirm";

interface LoginProps {}

const ResetPassword: FunctionComponent<LoginProps> = () => {
  const [checked, setChecked] = useState(false);
  const notify = (name: string) => toast.success("Тавтай морил :" + name);
  const notifyError = (error: string) => toast.error(error);

  const [form, setFormValue] = useState<any>({
    opt: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Check if localStorage is available before accessing it
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("resetEmail");
      if (storedEmail) {
        setFormValue((prevForm: any) => ({
          ...prevForm,
          email: storedEmail,
        }));
      }
    }
  }, []);

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (form.password !== form.confPass) {
      return notifyError("Нууц үг зөрүүтэй байна");
    }
    axiosInstance
      .post("/forgetPassword/checkOpt", form)
      .then((response) => {
        notify("Success");
        console.log(response.data.data);
        setChecked(true);
        localStorage.removeItem("resetEmail");
      })
      .catch((error) => {
        console.error(
          "There was a problem with the login request:",
          error.message
        );
      });
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setFormValue({
      ...form,
      [name]: value,
    });
  };

  console.log(form);

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
                  <form className={` ${checked ? "hidden" : "block"}`}>
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                      {/* Your social media buttons */}
                    </div>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                        Баталаажуулах
                      </p>
                    </div>
                    <div className="relative mb-6  rounded-md">
                      <label htmlFor="exampleFormControlInput22">
                        Нууц үг:
                      </label>
                      <input
                        type="text"
                        id="exampleFormControlInput22"
                        className="mt-2 border peer block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        placeholder="Password"
                        name="opt"
                        value={form.opt}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="my-2 text-center lg:text-left">
                      <button
                        type="button"
                        onClick={handleLogin}
                        className="my-4 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      >
                        Батлах
                      </button>
                      <p className="mb-0 mx-auto text-center text-sm font-semibold">
                        Энд дарж бүртгэлээ үүсгээрэй?
                        <Link
                          href="/register"
                          className="underline text-orange-500 transition duration-150 ease-in-out hover:text-orange-600 focus:text-orange-600 active:text-orange-700"
                        >
                          Бүртгүүлэх
                        </Link>
                      </p>
                    </div>
                  </form>
                  {checked ? <PasswordConfirm /> : null}
                </div>
              </div>
            </div>
          </section>
        </BestDiv>
      </Layout>
    </>
  );
};

export default ResetPassword;
