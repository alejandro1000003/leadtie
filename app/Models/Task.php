<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'opportunity_id', 'title', 'description', 'completed'
    ];

    /**
     * Relación: una tarea pertenece a una oportunidad.
     */
    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class);
    }
}
