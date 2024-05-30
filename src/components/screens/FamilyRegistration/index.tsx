// Note: FamilyRegistration component...!

'use client';
import React, { useEffect } from 'react';
import AuthLayout from '@/components/ui/AuthLayout';
import MainLayout from '@/components/common/MainLayout';
import FamilyRegistrationForm from "./FamilyRegistration";

const FamilyRegistration = () => {

    return (
        <MainLayout>
            <AuthLayout>
                <FamilyRegistrationForm />
            </AuthLayout>
        </MainLayout>
    );
};

export default FamilyRegistration;