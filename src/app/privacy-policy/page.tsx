"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="container text-zinc-900 dark:text-primary-foreground mx-auto px-4 py-8 max-w-4xl">
      <Button onClick={() => router.back()}>Go back</Button>

      <h1 className="py-6 text-primary text-3xl font-bold mb-2 text-center">
        ParkSU Privacy Policy
      </h1>
      <ModeToggle />

      <p className="text-sm text-gray-600 mb-2 text-center">
        Effective Date: November 18, 2025
      </p>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Last Updated: November 18, 2024
      </p>

      <div className="prose prose-sm max-w-none">
        <p>
          At ParkSU, we value your privacy and are committed to protecting the
          personal information you share with us. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          use our system.
        </p>
        <br />
        <p>
          If you do not agree with this Privacy Policy, please do not use our
          services.
        </p>

        <ScrollArea className="mt-6 h-[60vh] border rounded-md p-4">
          <ol className="list-decimal space-y-6 pl-6">
            <li>
              <h2 className="text-xl font-semibold">Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <p>
                    When you use our system, we may collect personal
                    information, including but not limited to:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Vehicle Gate Pass Number</li>
                    <li>User type (STUDENT, STAFF, or FACULTY)</li>
                    <li>College/Department Affiliation</li>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Location Data</h3>
                  <p>
                    To provide real-time parking monitoring and navigation
                    features, we collect:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      GPS location data of your device (only when the system is
                      in use).
                    </li>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Session Data</h3>
                  <p>
                    We collect information related to your parking sessions,
                    including:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Parking space ID and location</li>
                    <li>Session starts and end times</li>
                    <li>Notifications and reminders</li>
                  </ul>
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">
                How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ol className="list-decimal pl-5">
                <li>
                  Provide Services: Manage your parking sessions, monitor
                  parking availability, and send notifications.
                </li>
                <li>
                  Enhance User Experience: Analyze usage data to improve system
                  performance and features.
                </li>
                <li>
                  Communicate with You: Send session reminders, system updates,
                  and respond to inquiries.
                </li>
                <li>
                  Security and Compliance: Ensure the safety of our users and
                  compliance with legal obligations.
                </li>
                <li>
                  Research and Analysis: Conduct aggregated and anonymized
                  research such as peak hours analysis, occupancy rate analysis,
                  user behavior analysis and space utilization analysis to
                  provide data and improve parking infrastructure in Palawan
                  State University.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">
                How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. However, we may share
                your information in the following cases:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <h3 className="text-lg font-semibold">Service Providers</h3>
                  <p>
                    We may share information with third-party service providers
                    who help us deliver our services, such as:
                  </p>
                  <ol className="list-lower-alpha pl-5">
                    <li>Cloud database and storage providers</li>
                    <li>
                      Notification services (e.g., email or push notifications)
                    </li>
                  </ol>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Legal Obligations</h3>
                  <p>We may disclose your information if required to:</p>
                  <ol className="list-lower-alpha pl-5">
                    <li>Comply with legal or regulatory obligations.</li>
                    <li>
                      Respond to lawful requests from government authorities.
                    </li>
                  </ol>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Aggregated Data</h3>
                  <p>
                    We may share anonymized, aggregated data with partners or
                    stakeholders for research or reporting purposes.
                  </p>
                </li>
              </ol>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Data Retention</h2>
              <p>
                We retain your personal data only as long as necessary to
                fulfill the purposes outlined in this Privacy Policy or comply
                with legal obligations. Once data is no longer needed, it is
                securely deleted or anonymized.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Data Security</h2>
              <p>We implement the following measures to protect your data:</p>
              <ul className="list-disc pl-5">
                <li>
                  Encryption: Sensitive information is encrypted during
                  transmission and storage.
                </li>
                <li>
                  Access Controls: Only authorized personnel have access to your
                  data.
                </li>
                <li>
                  Regular Audits: Our systems undergo regular security audits
                  and updates.
                </li>
              </ul>
              <p>
                However, no method of transmission or storage is completely
                secure. We cannot guarantee the absolute security of your data.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Your Rights</h2>
              <p>
                As a user, you have the following rights regarding your personal
                information:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <h3 className="text-lg font-semibold">
                    Access and Correction
                  </h3>
                  <ul className="list-disc pl-5">
                    <li>
                      You may request access to the personal data we hold about
                      you and correct any inaccuracies.
                    </li>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Data Portability</h3>
                  <ul className="list-disc pl-5">
                    <li>
                      You may request a copy of your data in a portable format.
                    </li>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">Deletion</h3>
                  <ul className="list-disc pl-5">
                    <li>
                      You may request the deletion of your personal data,
                      subject to any legal or contractual obligations.
                    </li>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg font-semibold">
                    Withdrawal of Consent
                  </h3>
                  <ul className="list-disc pl-5">
                    <li>
                      If you have consented to the processing of your data, you
                      may withdraw consent at any time.
                    </li>
                  </ul>
                </li>
              </ol>
              <p>
                To exercise these rights, please contact us at
                bacaltosbaryshnikov@gmail.com.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">
                International Data Transfers
              </h2>
              <p>
                As our system may operate in multiple regions, your data may be
                transferred to and processed in countries other than your own.
                We ensure that appropriate safeguards are in place to protect
                your data.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Privacy of Minors</h2>
              <p>
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                minors. If we become aware that a minor has provided us with
                personal data, we will take steps to delete it.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">
                Updates to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Significant
                changes will be communicated to users through the platform or
                via email. The &lsquo;Last Updated&lsquo; date at the top of
                this policy indicates the most recent revision.
              </p>
            </li>

            <li>
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                For questions or concerns regarding this Privacy Policy, please
                contact us at:
              </p>
              <ul className="list-disc pl-5">
                <li>Email: bacaltosbaryshnikov@gmail.com</li>
                <li>Phone: 09704879032</li>
              </ul>
            </li>
          </ol>
        </ScrollArea>

        <p className="mt-6">
          By using our system, you acknowledge that you have read and understood
          this Privacy Policy and agree to its terms. Thank you for trusting
          ParkSU with your parking needs.
        </p>
      </div>
    </div>
  );
}
