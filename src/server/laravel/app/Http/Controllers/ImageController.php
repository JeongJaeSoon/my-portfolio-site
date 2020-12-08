<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * @param string $stackName
     * @param UploadedFile $stackImg
     * @return string
     */
    public function saveStackImg(string $stackName, UploadedFile $stackImg): string
    {
        $ext = $stackImg->extension();
        $storagePath = "stack/${stackName}.${ext}";
        Storage::putFileAs('public', $stackImg, $storagePath);
        return $storagePath;
    }

    /**
     * @param string $imgPath
     * @return string
     */
    public function getStackImg(string $imgPath): string
    {
        $stackImg = base64_encode(Storage::get("public/${imgPath}"));
        $ext = pathinfo("storage/${imgPath}", PATHINFO_EXTENSION);

        return "data:image/${ext};base64,${stackImg}";
    }
}
