import { useState } from "react";
import Navbar from "../layouts/Navbar";
import CreatePostModal from "../components/post/CreatePostModal";

const MainLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar onOpenModal={() => setIsOpen(true)} />

      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {children}
    </>
  )
}

export default MainLayout