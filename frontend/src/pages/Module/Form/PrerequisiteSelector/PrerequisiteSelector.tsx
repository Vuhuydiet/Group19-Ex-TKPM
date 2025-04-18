import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { CourseAPIServices } from '../../../../services/courseAPIServices';
import "./prerequisite_selector.css"

// const DUMMY_MODULES = [
//     { id: 1, name: "Module 1" },
//     { id: 2, name: "Module 2" },
//     { id: 3, name: "Module 3" },
//     { id: 4, name: "Module 4" },
//     { id: 5, name: "Module 5" },
//     { id: 6, name: "Module 6" },
//     { id: 7, name: "Module 7" },
//     { id: 8, name: "Module 8" },
//     { id: 9, name: "Module 9" },
//     { id: 10, name: "Module 10" },
// ];

interface PrerequisiteSelectorProps {
    setPrerequisite: (prerequisite: string[]) => void,
    setIsHide: (isHide: boolean) => void

}

const PrerequisiteSelector = ({ setPrerequisite, setIsHide }: PrerequisiteSelectorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const courseService = new CourseAPIServices();
    const [modules, setModules] = useState<{ id: string, name: string }[]>([]);


    useEffect(() => {
        // Gọi API lấy danh sách module
        const fetchModules = async () => {
            try {
                const data = await courseService.getCourses();
                setModules(data.map(module => ({ ...module, id: (module.id) }))); // Cập nhật state
            } catch (error) {
                console.error("Failed to fetch modules", error);
            }
        };

        fetchModules();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const items = container.querySelectorAll(".selector__item");
            const containerHeight = container.clientHeight;
            const scrollTop = container.scrollTop;

            items.forEach((item) => {
                const el = item as HTMLElement;
                const itemTop = el.offsetTop;
                const itemBottom = itemTop + el.offsetHeight;
                const containerBottom = scrollTop + containerHeight;

                const isVisible = itemTop >= scrollTop && itemBottom <= containerBottom;

                const distance = Math.abs(scrollTop - itemTop);
                const ratio = Math.min(distance / (containerHeight / 2), 1);

                const scale = 1 - ratio * 0.15;
                const opacity = 1 - ratio * 0.5;

                const blur = isVisible ? 0 : ratio * 5;

                el.style.transform = `scale(${scale})`;
                el.style.opacity = `${opacity}`;
                el.style.filter = `blur(${blur}px)`;
            });
        };

        const scrollToFirstItem = () => {
            const firstItem = container.querySelector(".selector__item") as HTMLElement;
            if (firstItem) {
                const offset = firstItem.offsetTop - (container.clientHeight / 2 - firstItem.offsetHeight / 2);
                container.scrollTop = offset;
            }
        };

        const timeout = setTimeout(() => {
            scrollToFirstItem();
            handleScroll();
        }, 50);

        container.addEventListener("scroll", handleScroll);
        return () => {
            clearTimeout(timeout);
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleSave = () => {
        const selectedModules = Array.from(containerRef.current?.querySelectorAll("input[type='checkbox']:checked") || []).map((checkbox) => checkbox.id);
        setPrerequisite(selectedModules);
        setIsHide(false);
    }

    const handleCancel = () => {
        setIsHide(false);
    }


    return (
        <>
            <div className="virtual-background virtual-background-frontside">

                <div className="selector">
                    <div className="selector__header">
                        <h1>Prerequisite Selector</h1>
                        <p>Choose prerequisite module</p>
                    </div>

                    <div className="selector__body" ref={containerRef}>
{/* 
                        {modules.map((mod) => (
                            <>
                                <input type="checkbox" id={String(mod.id)} />
                                <label htmlFor={mod.name} key={mod.id} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{mod.name}</span>
                                    </div>
                                </label>
                            </>
                        ))} */}
                        {modules.map((mod) => (
                            <div key={mod.id} className="selector__wrapper">
                                <input type="checkbox" id={String(mod.id)} />
                                <label htmlFor={String(mod.id)} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{mod.name}</span>
                                    </div>
                                </label>
                            </div>
                        ))}
                        <div className="selector__item selector__item--spacer"></div>
                        <div className="selector__item selector__item--spacer"></div>
                        <div className="selector__item selector__item--spacer"></div>

                    </div>

                    <div className="selector__footer">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PrerequisiteSelector;