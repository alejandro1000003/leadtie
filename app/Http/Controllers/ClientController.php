<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{

    /**
     * Display the specified resource. (GET)
     */
    public function show($id)
    {
        $client = Client::find($id);
    
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
    
        return response()->json($client);
    }

    /**
     * Display a listing of the resource. (GET)
     */
    public function index(Request $request)
    {
        $allowedFields = ['first_name', 'last_name', 'email','address', 'phone', 'company_name'];
        $allowedDirections = ['asc', 'desc'];
    
        $validator = Validator::make($request->all(), [
            'first_name' => 'nullable|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Validation error', 'errors' => $validator->errors()], 400);

        $clients = Client::query();
        
        // Apply filters based on the request parameters
        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $clients->where($field, 'like', '%' . $request->$field . '%');
            }
        }

        $perPage = $request->has('per_page') ? (int) $request->per_page : 15;
        $orderBy = in_array($request->order_by, $allowedFields) ? $request->order_by : 'id';
        $direction = in_array($request->direction, $allowedDirections) ? $request->direction : 'asc';
        
        $clients = $clients->orderBy($orderBy, $direction);
        $clients = $clients->paginate($perPage);
    
        return response()->json($clients);
    }
    
    /**
     * Store a newly created resource in storage. (POST)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'email' => 'required|email|max:150|unique:clients,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $client = Client::create($request->only('first_name', 'last_name', 'email', 'phone', 'address', 'company_name'));

        return response()->json([
            'message' => $client ? 'Client created successfully' : 'Error creating client',
            'status' => $client ? 201 : 501
        ], $client ? 201 : 501);
    }
    
    /**
     * Update the specified resource in storage totally. (PUT)
     */
    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
       
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|nullable|string|max:100',
            'email' => 'required|email|max:150|unique:clients,email,' . $client->id,
            'phone' => 'required|nullable|string|max:20',
            'address' => 'required|nullable|string|max:255',
            'company_name' => 'required|nullable|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $client->first_name = $request->first_name;
        $client->last_name = $request->last_name;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->address = $request->address;
        $client->company_name = $request->company_name;

        $client->save(); // Save the updated client to the database

        return response()->json([
            'message' => 'Client updated successfully',
            'status' => 200
        ], 200); // Return a 200 OK status code
    }
    
    /**
     * Update the specified resource in storage partially. (PATCH)
     */
    public function updatePartial(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:100',
            'last_name' => 'sometimes|nullable|string|max:100',
            'email' => 'sometimes|required|email|max:150|unique:clients,email,' . $client->id,
            'phone' => 'sometimes|nullable|string|max:20',
            'address' => 'sometimes|nullable|string|max:255',
            'company_name' => 'sometimes|nullable|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $client->first_name = $request->first_name;
        $client->last_name = $request->last_name;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->address = $request->address;
        $client->company_name = $request->company_name;

        $client->save(); // Save the updated client to the database

        return response()->json([
            'message' => 'Client updated successfully',
            'status' => 200
        ], 200); // Return a 200 OK status code
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $deleted = $client->delete(); // Attempt to delete the client from the database

        if ($deleted) {
            return response()->json(['message' => 'Client deleted successfully'], 200); // Return a 200 OK status code
        }

        return response()->json(['message' => 'Error deleting client'], 500); // Return a 500 Internal Server Error status code
    }
}
