import { CloudSun } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center gap-3 p-4 border-b border-border">
      <div className="p-2 bg-primary rounded-lg text-primary-foreground">
        <CloudSun size={24} />
      </div>
      <h1 className="text-2xl font-headline font-bold text-foreground">
        Weather Parader
      </h1>
    </header>
  );
};

export default Header;
