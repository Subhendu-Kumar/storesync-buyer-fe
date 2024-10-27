import Image from 'next/image'
import ErrorImage from "@/public/404.svg";

const ErrorScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full h-auto">
          <Image src={ErrorImage} alt="error 404" />
        </div>
        <h1 className="mt-4 text-center text-3xl font-sans font-semibold text-black">
          URL does not exist!
        </h1>
        <p className="mt-4 text-center text-xl font-sans font-medium text-gray-500">
          Looks like the page that you are looking for does not exist. Please
          enter a valid URL and try again.
        </p>
      </div>
  )
}

export default ErrorScreen