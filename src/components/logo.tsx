import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 py-6">
      <Image src={"/logo.png"} alt="parksu-logo" width={30} height={30} />
      <h1 className="text-primary text-xl font-bold">ParkSU</h1>
    </div>
  );
};

export default Logo;
