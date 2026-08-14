<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index()
    {
        $modules = Module::orderBy('name', 'asc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $modules,
        ]);
    }

    public function show($slug)
    {
        $module = Module::where('slug', $slug)->first();

        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $module,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:modules,slug',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
        ]);

        $module = Module::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $module,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'sometimes|numeric|min:0',
        ]);

        $module->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $module,
        ]);
    }

    public function destroy($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Module deleted successfully',
        ]);
    }
}
