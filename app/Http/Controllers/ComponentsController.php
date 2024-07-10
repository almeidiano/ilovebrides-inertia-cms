<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentsController extends Controller
{
    public function showFooterJson() {
        $json = File::get(resource_path('js/Components/components/footer.json'));
        $data = json_decode($json, true);

        return response()->json($data);
    }

    public function showNavigationJson() {
        $json = File::get(resource_path('js/Components/components/navigation.json'));
        $data = json_decode($json, true);

        return response()->json($data);
    }

    public function showFooter() {
        $json = File::get(resource_path('js/Components/components/footer.json'));
        $data = json_decode($json, true);

        return Inertia::render('components/footer/Footer', ['dataState' => $data, 'appUrl' => env('APP_URL')]);
    }

    public function showNavigation() {
        $json = File::get(resource_path('js/Components/components/navigation.json'));
        $data = json_decode($json, true);

        return Inertia::render('components/navigation/Navigation', ['dataState' => $data, 'appUrl' => env('APP_URL')]);
    }

    public function showFooterIframe() {
        $json = File::get(resource_path('js/Components/components/footer.json'));
        $data = json_decode($json, true);

        // return response()->json($data);
        return Inertia::render('iframes/FooterIframe', ['data' => $data]);
    }

    public function showNavigationIframe() {
        $json = File::get(resource_path('js/Components/components/navigation.json'));
        $data = json_decode($json, true);

        // return response()->json($data);
        return Inertia::render('iframes/NavigationIframe', ['data' => $data]);
    }

    public function updateNavigation(Request $request) {

        try {
            $navigationJson = $request->getContent();

            File::put(resource_path('js/Components/components/navigation.json'), $navigationJson);
            return Inertia::render('components/navigation/Navigation', ['status' => true]);
        }Catch (\Exception $e) {
            return Inertia::render('components/navigation/Navigation', ['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateFooter(Request $request) {

        try {
            $footerJson = $request->getContent();

            File::put(resource_path('js/Components/components/footer.json'), $footerJson);
            return Inertia::render('components/footer/Footer', ['status' => true]);
        }Catch (\Exception $e) {
            return Inertia::render('components/footer/Footer', ['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateNavigationLogo(Request $request) {

        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,jpg,png,svg,webp|max:5120'
            ]);

            $ext = $request->file->extension();
            $imageName = md5(time()).'.'.$ext;
            $request->file->move(public_path('media/images'), $imageName);

            // trocar a logo no arquivo json
            $navigationJson = File::get(resource_path('js/Components/components/navigation.json'));

            $navigationDecoded = json_decode($navigationJson, true);
            $navigationDecoded['logo'] = asset('media/images/'.$imageName);

            File::put(resource_path('js/Components/components/navigation.json'), json_encode($navigationDecoded));

            return Inertia::render('components/navigation/Navigation', ['status' => true, 'message' => asset('media/images/'.$imageName)]);
        }Catch (\Exception $e) {
            return Inertia::render('components/navigation/Navigation', ['status' => false, 'message' => $e->getMessage()]);
        }

    }

    public function updateFooterLogo(Request $request) {

        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,jpg,png,svg,webp|max:5120'
            ]);

            $ext = $request->file->extension();
            $imageName = md5(time()).'.'.$ext;
            $request->file->move(public_path('media/images'), $imageName);

            // trocar a logo no arquivo json
            $footerJson = File::get(resource_path('js/Components/components/footer.json'));

            $footerDecoded = json_decode($footerJson, true);
            $footerDecoded['logo'] = asset('media/images/'.$imageName);

            File::put(resource_path('js/Components/components/footer.json'), json_encode($footerDecoded));

            return Inertia::render('components/footer/Footer', ['status' => true, 'message' => asset('media/images/'.$imageName)]);
        }Catch (\Exception $e) {
            return Inertia::render('components/footer/Footer', ['status' => false, 'message' => $e->getMessage()]);
        }

    }
}

