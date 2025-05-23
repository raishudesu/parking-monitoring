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
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
          {" "}
          <Image src={"/logo.png"} alt="parksu-logo" width={30} height={30} />
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
        <section
          className="w-full py-12 md:py-24 lg:py-32 relative flex justify-center
        bg-[url('/form-bg.png')]
        bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute inset-0 bg-sidebar/30 dark:bg-sidebar-foreground/10 backdrop-blur-sm"></div>
          <div className="container px-4 md:px-6 z-10 max-w-screen-lg flex justify-center mx-auto">
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
                  <p className="text-center text-primary-foreground md:text-xl">
                    Our web-based parking monitoring system provides real-time
                    data on parking availability, occupancy, and trends to help
                    you optimize parking infrastructure.
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
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Real-Time Parking Monitoring
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ParkSU provides real-time data on parking availability,
                  occupancy, and trends.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:gap-12">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="/realtime.png"
                  alt="Realtime Parking Dashboard"
                  fill
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 text-center">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Real-Time Parking Availability
                      </h3>
                      <p className="text-muted-foreground">
                        Monitor the availability of parking spaces in real-time
                        to optimize parking infrastructure.
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
        <section
          id="analytics"
          className="w-full py-12 md:py-24 lg:py-32 max-w-screen-lg flex justify-center mx-auto"
        >
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:gap-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Data Analytics
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our data analytics dashboard provides deep insights into your
                  parking usage, helping you make informed decisions to optimize
                  parking infrastructure.
                </p>
                <ul className="grid gap-2 py-4 text-center">
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
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="/analytics.png"
                  alt="Analytics Dashboard"
                  fill
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </section>
        <section
          id="visualization"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6 max-w-screen-lg flex justify-center mx-auto">
            <div className="grid items-center gap-6">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="/mapping.png"
                  alt="Parking Spaces Mapping"
                  fill
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Intuitive Data Visualization
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our data visualization tools make it easy to understand and
                  interpret your parking data, with interactive charts, graphs,
                  and maps.
                </p>
                <ul className="grid gap-2 py-4 text-center ">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Interactive charts and graphs
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Mapping of parking locations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-screen-lg flex justify-center mx-auto">
            <div className="text-center flex flex-col items-center justify-center space-y-4">
              <div className=" space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied users about how our parking monitoring
                  system has helped them optimize their parking experience.
                </p>
              </div>
              <div className="grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
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
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
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
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
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
