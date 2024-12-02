import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddProductComponent } from "../../pages/add-product";
import { ViewProductComponent } from "../../pages/view-product";

export const MainContent = () => {
    return (
        <div className="main-content p-3">
            <Routes>
                <Route path="/" element={<ViewProductComponent />} />
                <Route path="/add-product" element={<AddProductComponent />} />
            </Routes>
        </div>
    )
}