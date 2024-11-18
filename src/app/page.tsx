/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ck7pYNuBY21
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeedbackForm from "@/components/feedback-form";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/logo";

export default function Home() {
  const textAnimation = `animate-text bg-gradient-to-r from-[#FE7D55] via-purple-400 to-orange-500 bg-clip-text font-black text-transparent`;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="w-full overflow-auto px-4 lg:px-6 h-14 flex items-center gap-2">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <svg
            fill="#FE7D55"
            viewBox="0 0 512 512"
            id="icons"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(270)"
            className="h-6 w-6"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z"></path>
              <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"></path>
              <path d="M400,256a16,16,0,0,1-14.93-10.26l-22.84-59.37a8,8,0,0,0-4.6-4.6l-59.37-22.84a16,16,0,0,1,0-29.86l59.37-22.84a8,8,0,0,0,4.6-4.6L384.9,42.68a16.45,16.45,0,0,1,13.17-10.57,16,16,0,0,1,16.86,10.15l22.84,59.37a8,8,0,0,0,4.6,4.6l59.37,22.84a16,16,0,0,1,0,29.86l-59.37,22.84a8,8,0,0,0-4.6,4.6l-22.84,59.37A16,16,0,0,1,400,256Z"></path>
            </g>
          </svg>
          <span className="sr-only">Parking Monitoring System</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#analytics"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Analytics
          </Link>
          <Link
            href="#visualization"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Visualization
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 text-center">
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="flex flex-col items-center gap-6 text-center space-y-2">
                  <Logo />
                  <h1
                    className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ${textAnimation} py-2`}
                  >
                    Real-Time Parking Monitoring with Analytics and
                    Visualization
                  </h1>
                  <p className="text-center text-muted-foreground md:text-xl">
                    Our web-based parking monitoring system provides real-time
                    data on parking availability, occupancy, and trends to help
                    you optimize your parking infrastructure.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Link
                    href="/gpo/sign-in"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    For Gate Pass Owners
                  </Link>
                  <Link
                    href="/admin/sign-in"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    For Administrators
                  </Link>
                </div>
              </div>
              {/* <Image
                src="/form-bg.png"
                alt="Parking Monitoring"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                width="550"
                height="550"
              /> */}
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 text-center md:text-start">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Real-Time Parking Monitoring
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system provides real-time data on parking availability,
                  occupancy, and trends to help you make informed decisions
                  about your parking infrastructure.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src={"/realtime.png"}
                alt="Real-Time Monitoring"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width="550"
                height="310"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 text-center md:text-start ">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Real-Time Parking Availability
                      </h3>
                      <p className="text-muted-foreground">
                        Monitor the availability of parking spaces in real-time
                        to optimize your parking infrastructure.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Occupancy Tracking</h3>
                      <p className="text-muted-foreground">
                        Track the occupancy of your parking lots and garages to
                        identify peak usage times and patterns.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Trend Analysis</h3>
                      <p className="text-muted-foreground">
                        Analyze historical data to identify long-term trends and
                        patterns in your parking usage.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="analytics" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="text-center md:text-start space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Data Analytics
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our data analytics dashboard provides deep insights into your
                  parking usage, helping you make informed decisions to optimize
                  your infrastructure.
                </p>
                <ul className="grid gap-2 py-4 text-center md:text-start ">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Customizable dashboards and reports
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Historical trend analysis
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Real-time data updates
                  </li>
                </ul>
              </div>
              <Image
                src={"/analytics.png"}
                alt="Data Analytics"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width="550"
                height="310"
              />
            </div>
          </div>
        </section>
        <section
          id="visualization"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                src={"/mapping.png"}
                alt="Data Visualization"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width="550"
                height="310"
              />
              <div className="text-center md:text-start space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Intuitive Data Visualization
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our data visualization tools make it easy to understand and
                  interpret your parking data, with interactive charts, graphs,
                  and maps.
                </p>
                <ul className="grid gap-2 py-4 text-center md:text-start ">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Interactive charts and graphs
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Geospatial mapping of parking locations
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Customizable dashboards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center md:text-start flex flex-col items-center justify-center space-y-4">
              <div className=" space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied users about how our parking monitoring
                  system has helped them optimize their parking experience.
                </p>
              </div>
              <div className="grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center md:items-start  space-y-4 rounded-lg bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="Customer Avatar"
                      />
                      <AvatarFallback>JJ</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Johnzyll Jimeno</div>
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;The real-time data and analytics provided by this
                    system have been invaluable in helping us optimize our
                    university&lsquo;s parking infrastructure. Highly
                    recommended!&ldquo;
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start  space-y-4 rounded-lg bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="Customer Avatar"
                      />
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Emmanuel Cari-an</div>
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;The data visualization tools make it easy to
                    understand and interpret parking data. This has been a
                    game-changer for an organization.&ldquo;
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start space-y-4 rounded-lg bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="Customer Avatar"
                      />
                      <AvatarFallback>FP</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Francis Poliran</div>
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;The real-time monitoring capabilities of this system
                    have helped us identify and address parking issues much more
                    quickly. It&lsquo;s been a game-changer for our
                    organization.&ldquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container grid md:grid-cols-2 items-center gap-4 px-4 md:px-6">
            <div className="text-center md:text-start space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get in Touch
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or interested in learning more? Fill out the form
                below and we&lsquo;ll be in touch.
              </p>
            </div>
            <div className="max-w-screen-sm">
              <FeedbackForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <ModeToggle />
        <p className="text-xs text-muted-foreground">
          &copy; 2024 ParkSU. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/terms-and-conditions"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms and Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ParkingMeterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 9a3 3 0 1 1 6 0" />
      <path d="M12 12v3" />
      <path d="M11 15h2" />
      <path d="M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3" />
      <path d="M12 19v3" />
    </svg>
  );
}
