<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $allowedFields = ['title', 'description', 'completed', 'opportunity_id'];
        $allowedDirections = ['asc', 'desc'];

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
            'opportunity_id' => 'nullable|integer|exists:opportunities,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $query = Task::query()->with('opportunity');

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
        $task = Task::with('opportunity')->find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        return response()->json($task);
    }

    /**
     * Get the total number of tasks. (GET)
     */
    public function getTotalTasks()
    {
        $totalTasks = Task::where('completed', false)->count();
        return response()->json(['total_tasks' => $totalTasks], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'required|boolean',
            'opportunity_id' => 'required|exists:opportunities,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $task = Task::create($request->only('title', 'description', 'completed', 'opportunity_id'));

        return response()->json([
            'message' => $task ? 'Task created' : 'Failed to create',
            'status' => $task ? 201 : 500
        ], $task ? 201 : 500);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'required|boolean',
            'opportunity_id' => 'required|exists:opportunities,id',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $task->update($request->only('title', 'description', 'completed', 'opportunity_id'));

        return response()->json(['message' => 'Task updated']);
    }

        
    public function updatePartial(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'completed' => 'sometimes|required|boolean',
            'opportunity_id' => 'sometimes|required|exists:opportunities,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $task->fill($request->only('title', 'description', 'completed', 'opportunity_id'));
        $task->save();

        return response()->json([
            'message' => 'Task updated successfully',
            'status' => 200
        ], 200);
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
