import { useState } from "react";
import { useDarkMode } from "./use-dark-mode";
import { Space, Switch } from "antd";
import { BulbOutlined, BulbFilled } from '@ant-design/icons'

export const DarkModeSwitch = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkMode, setDarkMode] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkMode(checked);
    }

    return (
        <>
        <Space direction="verticle">
            <Switch 
                size="large"
                className="
                    bg-slate-400
                    dark:bg-slate-500
                "
                checkedChildren={<BulbFilled />}
                // checkedChildren="light"
                unCheckedChildren={<BulbOutlined />}
                // unCheckedChildren="dark"
                onClick={() => toggleDarkMode(prevDarkMode => !prevDarkMode)}
                checked={darkMode}
            />
            </Space>
        </>
    )
}