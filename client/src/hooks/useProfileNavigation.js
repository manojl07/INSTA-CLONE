import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const useProfileNavigation = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const goToProfile = (targetUserId) => {
    if (!targetUserId) return;

    if (targetUserId === user?.id) {
      navigate("/profile");
    } else {
      navigate(`/profile/${targetUserId}`);
    }
  };

  return goToProfile;
};

export default useProfileNavigation;