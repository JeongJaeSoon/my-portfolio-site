<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * @param UploadedFile $img
     * @param string $imgName
     * @param string $imgPath
     * @return string
     */
    private function saveImg(string $imgPath, string $imgName, UploadedFile $img): string
    {
        $ext = $img->extension();
        $storagePath = "{$imgPath}/{$imgName}.${ext}";
        Storage::putFileAs('public', $img, $storagePath);

        return $storagePath;
    }

    /**
     * @param string $imgPath
     * @return string
     */
    public function getImg(string $imgPath): string
    {
        $stackImg = base64_encode(Storage::get("public/${imgPath}"));
        $ext = pathinfo("storage/${imgPath}", PATHINFO_EXTENSION);

        return "data:image/${ext};base64,${stackImg}";
    }

    /**
     * @param string $stackName
     * @param UploadedFile $stackImg
     * @return string
     */
    public function saveStackImg(string $stackName, UploadedFile $stackImg): string
    {
        return $this->saveImg('stack', $stackName, $stackImg);
//        $ext = $stackImg->extension();
//        $storagePath = "stack/${stackName}.${ext}";
//        Storage::putFileAs('public', $stackImg, $storagePath);
//        return $storagePath;
    }

    public function saveProjectImg(string $projectName, UploadedFile $projectImg): string
    {
        return $this->saveImg('project', $projectName, $projectImg);
    }
}
