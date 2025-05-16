import Toast from './Toast';

const NotificationsBox = () => {
  return (
    <div className="absolute top-14 right-0 flex flex-col gap-1 px-2 items-end md:top-8">
      <a
        href="https://forms.gle/SbtKCbAqF1AKzKhi7"
        target="_blank"
        rel="noreferrer"
        id="construction"
        className="bg-base py-2 px-3 rounded-lg text-sm transition-colors text-[#fadf63] hover:bg-background"
      >
        This application is under construction. Report any issues or feedback here.
      </a>
      <Toast />
    </div>
  );
};

export default NotificationsBox;
