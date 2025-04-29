<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OpportunityController extends Controller
{
    public function index(Request $request)
    {
        $allowedFields = ['title', 'value', 'status', 'client_id'];
        $allowedDirections = ['asc', 'desc'];

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'value' => 'nullable|numeric',
            'status' => 'nullable|in:Open,In Progress,Won,Lost',
            'client_id' => 'nullable|integer|exists:clients,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $query = Opportunity::query()->with('client');

        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $query->where($field, 'like', '%' . $request->$field . '%');
            }
        }

        $perPage = $request->input('per_page', 15);
        $orderBy = in_array($request->order_by, $allowedFields) ? $request->order_by : 'id';
        $direction = in_array($request->direction, $allowedDirections) ? $request->direction : 'asc';

        $query->orderBy($orderBy, $direction);

        return response()->json($query->paginate($perPage));
    }

    public function show($id)
    {
        $opportunity = Opportunity::with(['client', 'tasks'])->find($id);
        if (!$opportunity) return response()->json(['message' => 'Opportunity not found'], 404);
        return response()->json($opportunity);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'status' => 'required|in:Open,In Progress,Won,Lost',
            'client_id' => 'required|exists:clients,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $opportunity = Opportunity::create($request->only('title', 'value', 'status', 'client_id'));

        return response()->json([
            'message' => $opportunity ? 'Opportunity created' : 'Failed to create',
            'status' => $opportunity ? 201 : 500
        ], $opportunity ? 201 : 500);
    }

    public function update(Request $request, $id)
    {
        $opportunity = Opportunity::find($id);
        if (!$opportunity) return response()->json(['message' => 'Opportunity not found'], 404);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'status' => 'required|in:Open,In Progress,Won,Lost',
            'client_id' => 'required|exists:clients,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $opportunity->update($request->only('title', 'value', 'status', 'client_id'));

        return response()->json(['message' => 'Opportunity updated']);
    }

    public function destroy($id)
    {
        $opportunity = Opportunity::find($id);
        if (!$opportunity) return response()->json(['message' => 'Opportunity not found'], 404);

        $opportunity->delete();

        return response()->json(['message' => 'Opportunity deleted']);
    }
}
