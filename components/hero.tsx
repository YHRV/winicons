export default function Header() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The windows icons app
      </p>
      <p className="text-lg lg:text-xl !leading-tight mx-auto max-w-xl text-center">
        Give your desktop a fresh look with these icons
      </p>
      {/* 
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      */}
    </div>
  );
}
