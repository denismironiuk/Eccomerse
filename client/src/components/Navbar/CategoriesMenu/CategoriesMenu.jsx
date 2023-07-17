import React, { useState, useEffect, useRef } from "react";
import styles from "./CategoriesMenu.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const CategoriesMenu = ({ categories }) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
 
  return (
    <div  onClick={() => setShow(!show)} ref={ref} className={styles.left}>
      <DragHandleIcon className={styles.icon} />
      <p className="text-[14px] font-normal">All Categories</p>

      {show && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.submenu}
          onMouseLeave={()=>setShow(false)}
        >
          {categories &&
            categories.map((category) => (
              <li key={category._id}>
                <Link to={`products/${category.categoryName}/${category._id}`}>{category.categoryName}</Link>
              </li>
            ))}
        </motion.ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
