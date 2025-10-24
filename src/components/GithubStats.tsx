import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import GitHubCalendar from "react-github-calendar";
import React from "react";
import "react-tooltip/dist/react-tooltip.css";

export default function GithubStats() {
    const [isDark, setIsDark] = useState(false);

    // Observe changes to the document's class list to detect dark mode changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        setIsDark(document.documentElement.classList.contains('dark'));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex justify-center min-w-full text-pro900 dark:text-pro100">
            <GitHubCalendar
                username="rmluck"
                theme={{
                    light: ["#CCCCCC", "#10B981"],
                    dark: ["#333333", "#10B981"],
                }}
                colorScheme={isDark ? "dark" : "light"}
                weekStart={1}
                renderBlock={(block, activity) => 
                    React.cloneElement(block, {
                        "data-tooltip-id": "react-tooltip",
                        "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
                    })
                }
            />
            <Tooltip id="react-tooltip" style={{
                backgroundColor: "#B2EAE2",
                color: "#10B981",
                border: "1px solid #10B981",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "0.8rem",
                fontWeight: "700",
            }} />
        </div>
    );
}