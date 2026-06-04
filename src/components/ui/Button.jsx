import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  icon: Icon,
  iconRight: IconRight,
  fullWidth,
  disabled,
  type = 'button',
  className = '',
  ...props 
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    disabled && 'btn-disabled',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {Icon && <Icon className="btn-icon" size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      <span>{children}</span>
      {IconRight && <IconRight className="btn-icon-right" size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a 
          href={href} 
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }
    
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
