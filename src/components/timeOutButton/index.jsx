import { Button } from "@chakra-ui/react";
import { CloudUpload, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const TimeOutButton = ({ onClick, children, ...rest }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(60);

  const handleClick = async (e) => {
    try {
      setIsClicked(true);
      await onClick?.(e);
      setCounter(60);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isClicked) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsClicked(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isClicked]);

  return (
    <Button
      disabled={isClicked}
      onClick={handleClick}
      color="purple.700"
      bg="purple.200"
      p="1.5"
      rounded="2xl"
      size="sm"
      maxW="36px"
      maxH="36px"
      fontSize="xs"
      {...rest}
    >
      {!isClicked && children}
      {isClicked && `${counter}s`}
    </Button>
  );
};
