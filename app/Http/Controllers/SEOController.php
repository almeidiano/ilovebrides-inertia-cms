<?php

namespace App\Http\Controllers;

use App\Models\SEO;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class SEOController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyInfo = SEO::all();
        return Inertia::render('seo/Metadata', ['companyInfo' => $companyInfo[0]]);
    }

    public function update(Request $request)
    {
        try {

            $request->validate([
                'logoUrl' => 'required|image|mimes:jpeg,jpg,png,svg,webp|max:2048' // Máximo de 2MB
            ]);

            $metadata = $request->all();

            $ext = $metadata['logoUrl']->extension();
            $imageName = md5(time()).'.'.$ext;

            $metadata['logoUrl']->move(public_path('media/images'), $imageName);

            $companyInfo = SEO::find(1);
            $companyInfo->logoUrl = base_path().'/public/media/images/'.$imageName;
            $companyInfo->title = $metadata['title'];
            $companyInfo->description = $metadata['description'];
            $companyInfo->keywords = $metadata['keywords'];

            $companyInfo->save();

            return Inertia::render('seo/Metadata', [
                'companyInfo' => $companyInfo,
                'status' => 'success',
                'appUrl' => env('APP_URL')
            ]);

        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
