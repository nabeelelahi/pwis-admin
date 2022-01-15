import React, { useState, useEffect } from 'react';
import { LayoutComponent, Loader, UpdateWorkerForm } from '@components'


export default function UpdateWorker() {

    return (
        <LayoutComponent>
            <div className="container">
                <UpdateWorkerForm />
            </div>
        </LayoutComponent>
    )
}


