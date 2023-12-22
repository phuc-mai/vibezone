import {
  Home,
  AddPhotoAlternateOutlined,
  Search,
  GroupOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";

export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <ManageAccountsOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/edit-profile",
    label: "Edit Profile",
  },
];

export const pageTitles = [
  {
    url: "/",
    title: "Feed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search", 
    title: "Search",
  },
];

export const tabs = [
  {
    link: "posts",
    name: "Posts",
  },
  {
    link: "liked-posts",
    name: "Liked Posts",
  },
  {
    link: "saved-posts",
    name: "Saved Posts",
  },
  {
    link: "followers",
    name: "Followers",
  },
  {
    link: "following",
    name: "Following",
  },
];
