import Hpmepage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import ShowPage from "./pages/ShowPage";
import AdminPage from "./pages/AdminPage";

const routes = [
    {
        path: "/",
        element: <Hpmepage />,
    },
    {
        path: "blogs",
        element: <ListPage />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
    },
    {
        path: "/blogs/create",
        element: <CreatePage />,
    },
    {
        path: "/blogs/:id/edit",
        element: <EditPage />,
    },
    {
        path: "/blogs/:id",
        element: <ShowPage />,
    },
];

export default routes;
