"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();
  return (
    <div className="container text-zinc-900 dark:text-primary-foreground mx-auto px-4 py-8 max-w-4xl">
      <Button onClick={() => router.back()}>Go back</Button>
      <h1 className="py-6 text-primary text-3xl font-bold mb-6 text-center">
        ParkSU Terms and Conditions
      </h1>
      <ModeToggle />
      <p className="text-sm text-gray-600 mb-6 text-center">
        Last Updated: November 18, 2024
      </p>

      <div className="prose prose-sm max-w-none">
        <p>
          Welcome to ParkSU, a real-time parking monitoring system designed to
          provide users with an efficient way to manage and monitor parking
          activities within our network. By accessing or using our platform, you
          agree to be bound by the following Terms and Conditions.
        </p>
        <br />
        <p>
          Upon logging in to ParkSU, you are considered to agree to these terms.
          If you do not agree with these terms, please refrain from using our
          services.
        </p>

        <ScrollArea className="mt-6 h-[60vh] border rounded-md p-4">
          <ol className="list-decimal space-y-6 pl-6">
            <li>
              <h2 className="text-xl font-semibold">Definitions</h2>
              <ul className="list-decimal pl-5 space-y-1">
                <li>
                  &lsquo;System&lsquo; refers to ParkSU, including its website,
                  mobile application, and related software services.
                </li>
                <li>
                  &lsquo;User&lsquo; refers to any individual or entity using
                  the system.
                </li>
                <li>
                  &lsquo;Gate Pass Owner&lsquo; refers to a user that start and
                  ends a parking session.
                </li>
                <li>
                  &lsquo;Parking Session&lsquo; refers to the duration a user
                  occupies a parking space monitored by the system.
                </li>
                <li>
                  &lsquo;Administrator&lsquo; refers to authorized personnel
                  managing the parking system.
                </li>
                <li>
                  &lsquo;We/Us/Our&lsquo; refers to the system owners and
                  operators.
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Scope of Service</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Real-Time Monitoring: Our system provides real-time updates on
                  parking space availability and session details.
                </li>
                <li>
                  QR Code Integration: Gate Pass Owners can start a parking
                  session by scanning a QR code.
                </li>
                <li>
                  Notifications: Gate Pass Owners receive notifications related
                  to parking sessions, including reminders 30 minutes before
                  their session ends.
                </li>
                <li>
                  Administrative Features: Administrators manage parking spaces,
                  monitor usage, and generate reports.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">User Responsibilities</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Accuracy of Information: Users must ensure the accuracy of any
                  information they provide, including email addresses and
                  session details.
                </li>
                <li>
                  Compliance: Users must comply with all applicable laws,
                  parking regulations, and community guidelines.
                </li>
                <li>
                  Account Security: Users are responsible for maintaining the
                  security of their accounts and for all activities under their
                  account.
                </li>
                <li>
                  Parking Session Management: Gate Pass Owners must properly
                  start and end parking sessions to avoid additional charges or
                  penalties.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our{" "}
                <Link
                  href={"/privacy-policy"}
                  className="text-blue-500 hover:underline"
                >
                  {" "}
                  Privacy Policy
                </Link>{" "}
                to understand how we collect, use, and protect your information.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Timer Notifications: The system provides real-time countdown
                  notifications to ensure timely session management.
                </li>
                <li>
                  Email Reminders: Users will receive email reminders 30 minutes
                  before their session ends.
                </li>
                <li>
                  Disclaimer: We are not responsible for missed notifications
                  due to incorrect user settings, network issues, or technical
                  malfunctions.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">System Usage</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Prohibited Activities:
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tampering with the system or its functionalities.</li>
                    <li>Misuse of parking spaces monitored by the system.</li>
                    <li>Unauthorized access or use of administrator tools.</li>
                  </ul>
                </li>
                <li>
                  Updates and Modifications: We reserve the right to update,
                  modify, or discontinue features without prior notice.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">
                Limitations of Liability
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  System Accuracy: While we strive to provide accurate real-time
                  data, we cannot guarantee complete accuracy at all times due
                  to external factors (e.g., network connectivity, device
                  compatibility).
                </li>
                <li>
                  Service Interruptions: We are not liable for any losses
                  resulting from system downtime or interruptions.
                </li>
                <li>
                  Third-Party Services: We are not responsible for any
                  third-party services or integrations used with the system.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Termination</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  User Accounts: We reserve the right to suspend or terminate
                  user accounts for violations of these terms.
                </li>
                <li>
                  Service Access: Continued use of the system after termination
                  is prohibited.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Intellectual Property</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  All intellectual property rights related to the system,
                  including software, designs, trademarks, and content, remain
                  the property of ParkSU.
                </li>
                <li>
                  Unauthorized use, reproduction, or distribution of system
                  content is strictly prohibited.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Dispute Resolution</h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Governing Law: These terms are governed by the laws of the
                  Philippines.
                </li>
                <li>
                  Dispute Process: Any disputes will be resolved through
                  mediation or arbitration, as deemed appropriate by ParkSU.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Amendments</h2>
              <p>
                We may update these Terms and Conditions from time to time.
                Users will be notified of significant changes, and continued use
                of the system constitutes acceptance of the revised terms.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                For questions or concerns regarding these terms, please contact
                us at:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email: bacaltosbaryshnikov@gmail.com</li>
                <li>Phone: 09704879032</li>
              </ul>
            </li>
          </ol>
        </ScrollArea>

        <p className="mt-6">
          By using our system, you acknowledge that you have read, understood,
          and agreed to these Terms and Conditions. Thank you for choosing
          ParkSU for your parking needs.
        </p>
      </div>
    </div>
  );
}
