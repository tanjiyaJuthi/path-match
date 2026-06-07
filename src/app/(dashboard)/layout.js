const DashboardLayout = ({ children }) => {
    return (
        <div className="h-screen">
            <main className="">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;