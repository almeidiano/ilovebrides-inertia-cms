<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentsController extends Controller
{
    public function showFooter() {
        $json = File::get(resource_path('js/Components/components/footer.json'));
        $data = json_decode($json, true);

        // return response()->json($data);
        return Inertia::render('components/Footer', ['data' => $data]);
    }

    public function showNavigation() {
        $json = File::get(resource_path('js/Components/components/navigation.json'));
        $data = json_decode($json, true);

        return Inertia::render('components/Navigation', ['data' => $data]);
    }

    public function showFooterIframe() {
        $json = File::get(resource_path('js/Components/components/footer.json'));
        $data = json_decode($json, true);

        // return response()->json($data);
        return Inertia::render('iframes/Footer', ['data' => $data]);
    }

    public function showNavigationIframe() {
        $json = File::get(resource_path('js/Components/components/navigation.json'));
        $data = json_decode($json, true);

        // return response()->json($data);
        return Inertia::render('iframes/NavigationIframe', ['data' => $data]);
    }
}
