const HeaderIcon = ({ title, Icon }) => {
  return (
    <div
      className="group flex flex-col items-center cursor-pointer
     w-12 sm:w-20 hover:text-[#ea580c] "
    >
      <Icon className="h-8 group-hover:animate-bounce" />
      <p className=" opacity-0 group-hover:opacity-100 tracking-widest ">
        {title}
      </p>
    </div>
  );
};

export default HeaderIcon;
