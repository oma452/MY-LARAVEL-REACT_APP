import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { Input } from '@/components/ui/input';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category?: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    products: Product[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index() {
    const { products, flash, filters } = usePage().props as PageProps;

    const { data, setData, get, processing } = useForm({
        search: filters?.search || '',
        category: filters?.category || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('products.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const { delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}`)) {
            destroy(route("products.destroy", id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className='m-4 flex items-center justify-between'>
                <Link href={route('products.create')}>
                    <Button>Create a Product</Button>
                </Link>

                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        value={data.search}
                        onChange={e => setData('search', e.target.value)}
                        placeholder="Search by name"
                        className="w-64"
                    />

                    <select
                        name="category"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>
                        <option value="clothing">Clothing</option>
                        <option value="stationery">Stationery</option>
                    </select>

                    <Button type="submit">Filter</Button>
                </form>
            </div>

            {/* Show active filters */}
            {(filters.search || filters.category) && (
                <div className="m-4 text-sm text-gray-600">
                    {filters.search && <>Search: <strong>{filters.search}</strong> | </>}
                    {filters.category && <>Category: <strong>{filters.category}</strong> | </>}
                    <Button
                        variant="link"
                        className="px-1"
                        onClick={() => {
                            setData({ search: '', category: '' });
                            get(route('products.index'), {
                                preserveState: true,
                                replace: true,
                            });
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>
            )}

            {flash.message && (
                <div className='m-4'>
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('products.edit', product.id)}>
                                            <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
