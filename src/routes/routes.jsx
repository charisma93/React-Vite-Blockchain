import { 
    AppLayout,
    RootLayout 
} from "@components/layouts";
import { 
    HomePage, 
    TestPage 
} from "@pages";

export const routes = [
    {
        element: <RootLayout />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: '/index.html',
                        element: <HomePage />
                    },
                    {
                        path: '/test',
                        element: <TestPage />
                    }
                ]
            },
            //ADD OTHER LAYOUTS HERE (i.e. AuthLayout)
            // {
            //     element: <AuthLayout />,
            //     childre: [
            //         {
            //             path: '/auth',
            //             element: <AuthPage />
            //         }
            //     ]
            // }
        ]
    }
]