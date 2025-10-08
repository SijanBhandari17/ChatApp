const LoadingScreen = () => {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-4">
          <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
            <div className="border-primary-foreground h-7 w-7 rounded-full border-[3px]" />
          </div>
          <h1 className="text-primary">ConnectNow</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
