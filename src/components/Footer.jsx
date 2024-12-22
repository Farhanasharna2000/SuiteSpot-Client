import { useTheme } from '../Hook/UseTheme';
const Footer = () => {
  const { theme } = useTheme();
  return (
    <div className={`py-10 ${theme === "light" ? "bg-base-200" : "bg-gray-800 text-white"}`}>
      <div className="container mx-auto px-4">
       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p>
              Email:{" "}
              <a href="mailto:info@SuiteSpot.com" className=" hover:underline">
                info@SuiteSpot.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:underline">
                +123 456 7890
              </a>
            </p>
            <p>Address: 12/A Rankin St, Dhaka 1203, Bangladesh</p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Follow Us</h2>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400" aria-label="Facebook">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0h-21.35C.56 0 0 .562 0 1.255v21.49C0 23.437.56 24 1.325 24H12v-9.294H9.41v-3.625H12V8.413c0-2.588 1.493-4.047 3.771-4.047 1.093 0 2.236.195 2.236.195v2.486h-1.26c-1.245 0-1.63.775-1.63 1.568v1.885h2.773l-.442 3.625h-2.331V24h4.567c.765 0 1.325-.563 1.325-1.255V1.255c0-.693-.56-1.255-1.325-1.255z" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400" aria-label="Twitter">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.92 0 .385.044.761.128 1.124C7.688 8.094 4.064 6.13 1.64 3.161c-.423.723-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.316 0-.623-.03-.924-.086.624 1.956 2.432 3.379 4.576 3.419-1.676 1.31-3.791 2.091-6.089 2.091-.395 0-.788-.023-1.175-.069 2.174 1.394 4.757 2.209 7.548 2.209 9.056 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.014-.634.964-.694 1.8-1.56 2.462-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400" aria-label="LinkedIn">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c-5.488 0-9.9 4.413-9.9 9.9 0 4.989 3.657 9.122 8.438 9.878v-6.993h-2.54V12h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.093 0 2.236.195 2.236.195v2.486h-1.26c-1.245 0-1.63.775-1.63 1.568v1.885h2.773l-.442 3.625h-2.331v6.993c4.781-.756 8.438-4.889 8.438-9.878 0-5.487-4.412-9.9-9.9-9.9z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">About Us</h2>
            <p>
              SuiteSpot is your trusted partner for visa applications and requirements. Simplify the process and explore the world hassle-free!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-white">
          <p>© 2024 SuiteSpot. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
