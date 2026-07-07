import React from "react";

interface IFooterAdmin {
  leftActions?: React.ReactNode[];
  rightActions?: React.ReactNode[];
  component?: React.ReactElement;
}

const FooterAdmin: React.FC<IFooterAdmin> = ({
  leftActions,
  rightActions,
  component,
}) => {
  return (
    <div
      className="
       sticky 
       bottom-0 z-10
        border-t
        bg-white
        py-4
        px-6
        rounded-b-lg
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {leftActions?.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
          {component}
        </div>

        <div className="flex gap-3">
          {rightActions?.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterAdmin;
