
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center">
        <div className="text-primary font-bold text-2xl mr-2">
          <span className="text-white">Play</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-visualization-purple">Rithm</span>
        </div>
        <div className="hidden sm:flex px-2 py-1 bg-muted text-xs rounded-full">
          Beta
        </div>
      </div>
      <nav className="hidden md:flex gap-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Home
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Docs
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Examples
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          About
        </Link>
      </nav>
      <div className="flex gap-2">
        <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors">
          Load Example
        </button>
        <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-md text-sm transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
